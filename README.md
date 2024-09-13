# Astrid

Secure search for a combination of data structures

## Core Features

-   [ ] Feature 1: Search Engine built on top a combination of database and object + file stores.
-   [ ] Feature 2: Stringent security measures for accessing, searching and modifying data
-   [ ] Feature 3: Pipeline & API generation for storing/retrieving data
-   [ ] Feature 4: Replication control for all data storage solutions
-   [ ] Feature 5: Automatic syncing of files between computers
-   [ ] Feature 6: Realtime UI view of data locations

## TODO

### Implementation

#### Feature 1:

Research & Planning

-   [ ] Search Engine Selection:
    -   Research search engines (Elasticsearch, Meilisearch, etc.).
    -   Evaluate based on scalability, integration capabilities, and cost.
-   [ ] Data Compatibility:
    -   Determine the format and schema of database, file, and object stores.
    -   Plan for indexing both structured (database) and unstructured data (files, objects).
-   [ ] Indexing Strategy:
    -   Define what data should be indexed.
    -   Plan update frequencies for index synchronization.
    -   Decide on the use of primary and secondary indexes.
-   [ ] Query Requirements:
    -   Define the types of queries needed (full-text, keyword, etc.).
    -   Plan for filtering, sorting, and pagination.

Infrastructure Setup

-   [ ] Search Engine Deployment:
    -   Set up servers or containers for the search engine.
    -   Define cluster scaling for high availability.
-   [ ] Connector Setup:
    -   Build connectors to index database records.
    -   Build connectors to index file and object stores.
    -   Ensure the connectors sync data regularly and handle updates.

Implementation

-   [ ] Data Mapping:
    -   Create mappings to define how data from different sources should be indexed.
    -   Ensure compatibility between different formats (SQL, JSON, etc.).
-   [ ] Search Functionality:
    -   Implement search APIs for query input and output handling.
    -   Add support for filters, relevance scoring, and ranking.

Testing & Optimization

-   [ ] Performance Testing:
    -   Test indexing and querying speed with different data sizes.
-   [ ] Optimization:
    -   Optimize index size and query performance.
    -   Implement caching for frequent queries.

---

#### Feature 2: Stringent Security Measures for Accessing, Searching, and Modifying Data

Research & Planning
- [ ] Security Requirements:
  - Define encryption protocols (SSL/TLS, encryption at rest and in transit).
  - Plan multi-factor authentication (MFA) for sensitive operations.
  - Define user roles and permissions for data access.
- [ ] Compliance Considerations:
  - Research GDPR, CCPA, or other legal requirements related to data security.
  - Plan for logging and audit trails to track all data operations.

Implementation
- [ ] Authentication:
  - Set up OAuth2, JWT, or other secure authentication mechanisms.
  - Integrate MFA for user authentication.
- [ ] Authorization:
  - Implement role-based access control (RBAC).
  - Define permissions for creating, reading, updating, and deleting data.
- [ ] Data Encryption:
  - Implement encryption at rest (for all storage solutions).
  - Use SSL/TLS for secure data transmission.
- [ ] Security Logging:
  - Set up monitoring and logging for access and data changes.
  - Implement alerting for suspicious activities.

### Testing & Validation
- [ ] Penetration Testing:
  - Perform external and internal penetration testing.
- [ ] Vulnerability Scanning:
  - Regularly scan for vulnerabilities using security tools.
- [ ] Access Control Testing:
  - Test role-based access for different user roles.
  - Ensure proper permissions are enforced for data modification.

---

#### Feature 3: Pipeline & API Generation for Storing/Retrieving Data

Research & Planning
- [ ] API Design:
  - Define RESTful or GraphQL API structure for CRUD operations.
  - Plan API input/output validation rules.
- [ ] Pipeline Architecture:
  - Choose an architecture for data pipelines (e.g., message queues, event-driven).
  - Design data flow for writing and retrieving data from different storage systems.

### Implementation
- [ ] API Endpoints:
  - Build API endpoints for creating, reading, updating, and deleting data.
  - Implement input validation and error handling.
- [ ] Data Pipelines:
  - Set up pipelines for handling data flow from APIs to storage solutions (databases, object store, file store).
  - Ensure real-time data processing if required.
- [ ] Middleware:
  - Implement middleware for logging, security, and rate limiting.
  - Add caching mechanisms to optimize frequently accessed data.
- [ ] API Documentation:
  - Document all API endpoints with detailed usage instructions.
  - Create API examples for external developers.

### Testing
- [ ] API Load Testing:
  - Simulate high traffic and test API performance.
- [ ] Data Validation:
  - Ensure data consistency across the API and the underlying storage systems.
- [ ] Security Testing:
  - Test API endpoints for authentication and authorization vulnerabilities.

---

#### Feature 4: Replication Control for All Data Storage Solutions

Research & Planning
- [ ] Replication Strategy:
  - Decide on the replication mechanism (synchronous vs. asynchronous).
  - Choose regions or zones for replication to ensure data redundancy.
  - Plan how replication will handle failover and disaster recovery.
- [ ] Data Integrity:
  - Plan mechanisms for ensuring consistency during replication (e.g., versioning, conflict resolution).

Implementation
- [ ] Database Replication:
  - Set up master-slave or multi-region replication for databases.
  - Implement replication logging and monitoring.
- [ ] File & Object Store Replication:
  - Build versioning and replication mechanisms for files and objects.
  - Ensure that updates to files and objects are propagated to all replicas.
- [ ] Automatic Failover:
  - Implement automatic failover in case of data loss or downtime.
  - Test data recovery mechanisms.

### Testing
- [ ] Replication Testing:
  - Simulate failover scenarios and ensure data integrity.
- [ ] Consistency Testing:
  - Ensure that data across all replicas remain consistent, even during updates.
- [ ] Load Testing:
  - Test replication under high traffic or data load conditions.

---

#### Feature 5: Automatic Syncing of Files Between Computers

Research & Planning
- [ ] Sync Protocol:
  - Choose a syncing protocol (rsync, Syncthing, etc.).
  - Plan for bi-directional syncing with conflict resolution.
- [ ] File Change Detection:
  - Plan a mechanism to detect changes in files (file watchers, polling).
  - Consider file size and format limitations.

Implementation
- [ ] Sync Client Setup:
  - Set up file synchronization clients on computers.
  - Implement file watchers for real-time change detection.
- [ ] Syncing Logic:
  - Develop logic for conflict resolution during file syncing.
  - Ensure that deleted, modified, and newly added files are synced correctly.
- [ ] Encryption & Security:
  - Secure file transfers with encryption.
  - Ensure that only authorized devices are allowed to sync files.

### Testing
- [ ] Sync Performance Testing:
  - Test syncing for various file sizes, types, and network conditions.
- [ ] Conflict Handling Testing:
  - Simulate sync conflicts and test resolution strategies.
- [ ] Offline Sync Testing:
  - Ensure syncing works correctly when devices go offline and reconnect.

---

###### Feature 6: Real-time UI View of Data Locations

Research & Planning
- [ ] UI Design:
  - Design the user interface for displaying real-time data locations.
  - Plan for user-friendly sorting, filtering, and data browsing options.
- [ ] Backend Planning:
  - Decide on real-time technologies (WebSockets, Server-Sent Events, GraphQL subscriptions).
  - Plan the data structure and flow for real-time updates.

Implementation
- [ ] Real-time Data Updates:
  - Set up WebSocket or GraphQL subscriptions for real-time updates.
  - Ensure the backend pushes location changes to the frontend immediately.
- [ ] UI Implementation:
  - Build frontend components to display data and location changes in real-time.
  - Add filtering, sorting, and searching functionality in the UI.
- [ ] Integration:
  - Link backend real-time updates with the UI in a responsive manner.
  - Implement visual indicators for data loading and changes.

### Testing
- [ ] Real-time Performance Testing:
  - Simulate heavy traffic and test the UI's ability to handle updates.
- [ ] UI/UX Testing:
  - Perform user testing to ensure that the real-time data view is intuitive.
- [ ] Accuracy Testing:
  - Ensure data location updates are accurately reflected in the UI without delay.

#### Bugs
