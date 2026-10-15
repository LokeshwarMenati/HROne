# DECISIONS.md

1. **Indexes:**
   - `employees: {"emp_code": 1}` (unique): Guarantees employee identity uniqueness and provides fast O(1) lookups during punches and directory queries.
   - `employees: {"department": 1, "joined_on": 1}`: Enables instant department filtering, sorting, and efficient headcount aggregation without full scans.
   - `attendance_logs: {"emp_code": 1, "date": 1}` (unique): Enforces the fundamental business invariant of at most one attendance record per employee per calendar date, backing race-safe punch-ins and fast regularization lookups.
   - `attendance_logs: {"date": -1, "emp_code": 1}`: Backs the paginated `GET /attendance` list endpoint, allowing MongoDB to satisfy filter, sort, skip, and limit entirely via an index scan (`IXSCAN`).
   - `attendance_logs: {"emp_code": 1, "punch_out": 1}`: Backs the open-record punch-out lookup.
   - `attendance_logs: {"date": 1, "status": 1, "late_minutes": 1}`: Accelerates monthly and department analytics pipelines.
   - *Considered and rejected:* A sparse index on `{"punch_out": 1}`. Rejected because attendance documents frequently update from open to closed, and compound index `{"emp_code": 1, "punch_out": 1}` already covers the punch-out query with minimal overhead.

2. **Punch-in race:**
   When two identical punch-in requests for the same employee and date arrive simultaneously, both pass the read verification. When both issue `insert_one`, MongoDB's underlying WiredTiger storage engine serializes the write on the unique compound index `{"emp_code": 1, "date": 1}`. Exactly one worker thread acquires the unique index key and commits successfully, returning HTTP 201 Created. The second thread fails with a `pymongo.errors.DuplicateKeyError` (E11000). The API intercepts this exception and cleanly returns HTTP 409 Conflict with `"already punched in for this date"`, ensuring zero duplicate records and zero unhandled 500 errors.

3. **Ties:**
   In compliance with standard competition ranking (1, 2, 2, 4) using the MongoDB `$rank` window operator, tied employees share the identical rank and the subsequent rank is skipped. Because `limit` is applied *after* ranking (`$match: {rank: {$lte: limit}}`), all employees who tie at or below the cutoff rank are preserved in the result. For example, with `limit=2` and ranks `1, 2, 2`, three rows are returned. Rows tied on `total_late_minutes` are deterministically ordered by `emp_code` ascending.

4. **Headcount:**
   To guarantee employees with zero logs in the target month are counted, the aggregation pipeline begins with the `employees` collection rather than `attendance_logs`. It filters employees by `joined_on <= end_of_month` (and department if specified), groups by department to establish the true total headcount, and uses a `$lookup` stage to join relevant attendance records. Departments and employees with zero logs retain their true headcount while attendance aggregates default to zero or null.

5. **One thing you would change for 100x data:**
   For a hundredfold scale increase (~10M attendance records, 100k+ employees), monthly and department aggregations should not execute full pipeline scans on demand. I would introduce pre-aggregated daily/monthly materialized rollups maintained via MongoDB Change Streams or background cron workers, and range-shard the `attendance_logs` collection across shards on `{ "date": 1, "emp_code": 1 }`.
