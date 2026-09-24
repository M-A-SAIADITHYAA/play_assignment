# Production-Scale Vacation-Rental Marketplace Architecture

This document details the high-level system architecture and scaling strategy for a global vacation-rental marketplace (analogous to Airbnb), accompanying the diagram in `vacation-rental-marketplace-architecture.png` and `vacation-rental-marketplace-architecture.pdf`.

---

## 1. High-Level System Overview & Tiers

The architecture is partitioned into five distinct, decoupled operational tiers:

```
[ Clients & CDN ] ──> [ API Gateway & Security ] ──> [ Microservices Core ] ──> [ Storage & Cache Tier ]
                                                              │
                                                     [ Event Streaming (Kafka) ]
                                                              │
                                                     [ Async Workers & Search Indexers ]
```

---

## 2. Tier-by-Tier Scaling Strategy

### Tier 1: Frontend & Edge Delivery
* **Incremental Static Regeneration (ISR)**: Property listing pages are pre-rendered at build time and revalidated at the edge on a stale-while-revalidate cadence (e.g. `revalidate: 60s`).
* **Global Anycast Edge CDN**: 95%+ of read traffic for static HTML, JS/CSS bundles, and media is terminated at Cloudflare / AWS CloudFront edge nodes, achieving sub-50ms Time To First Byte (TTFB) globally.
* **Responsive Image Optimization**: Images are uploaded to S3 and transformed into modern formats (`AVIF`, `WebP`) with dynamic dimensions and DPR (Device Pixel Ratio) optimization at the edge via Cloudinary or Cloudflare Images.

### Tier 2: API Gateway & Traffic Security
* **Web Application Firewall (WAF)**: Mitigates volumetric DDoS, credential stuffing, and bot scrapers using managed bot signatures (e.g. AWS WAF, Kasada, Cloudflare Bot Management).
* **API Gateway & Routing**: Envoy / Kong API Gateway terminates TLS, enforces OAuth 2.0 JWT token validation, extracts user context, and routes requests with circuit breakers and load shedding.
* **GraphQL Federation (BFF)**: An Apollo Federation router merges subgraphs across individual domains (Listings, Bookings, Reviews, Users) into a single cohesive endpoint.

### Tier 3: Core Microservices Layer
* **Search & Discovery Service**: Built in Go for high-throughput, low-latency queries. Handles bounding-box geospatial queries, date filters, price brackets, and machine learning listing rankings.
* **Booking & Reservation Engine**: Implemented in Java / Temporal orchestrating a distributed **Saga pattern**:
  1. *Hold Inventory* (Reservation intent on calendar).
  2. *Authorize Payment* via payment gateway.
  3. *Confirm Booking* in database.
  4. *Compensating Transactions* automatically unwind state if any stage fails.
* **Availability & Calendar Engine**: Maintains bitset arrays (1 bit per calendar date) in Redis for instant O(1) date availability lookups and bitwise conflict detection.
* **Payments & Settlement Engine**: PCI-DSS Level 1 compliant gateway integration (Stripe, Adyen, Razorpay) handling customer charges, hold escrow, host payouts, and refund workflows.

### Tier 4: Storage, Caching, and Streaming Tier
* **Primary Relational Store (Aurora PostgreSQL)**:
  * Multi-AZ deployment with synchronous replication for zero data loss (RPO = 0).
  * Read Replicas scale read throughput for reviews, host profiles, and amenities.
  * Connection pooling via PgBouncer / AWS RDS Proxy prevents connection exhaustion.
* **Geospatial Search Engine (OpenSearch / Elasticsearch Cluster)**:
  * Dedicated cluster with `geo_point` mapping and geo-hash prefix trees for sub-second location filtering.
  * Synchronized near-real-time from PostgreSQL via Debezium Change Data Capture (CDC) over Kafka.
* **Distributed Caching (Redis 7 Cluster)**:
  * Multi-node cluster with Redis Sentinel for session caching, user profiles, and rate-limiting counters.
  * Distributed locking (Redlock) prevents concurrent reservation holds on identical listing dates.
* **Event-Driven Backbone (Apache Kafka)**:
  * Decouples synchronous transaction pipelines from downstream indexing, analytics, and notification pipelines (Email, Push, SMS).

### Tier 5: Deployment, CI/CD & Reliability
* **Multi-Region Kubernetes (EKS / GKE)**: Containerized workloads running across multiple Availability Zones with Horizontal Pod Autoscaler (HPA) responding to CPU, memory, and custom queue length metrics.
* **GitOps CI/CD**: ArgoCD synchronizes declarative Kubernetes manifests with automated canary rollouts and instant rollbacks on anomaly detection.
* **Observability**: OpenTelemetry instrumentation feeding Datadog / Prometheus for distributed tracing, real-time APM, and SLO / SLA tracking.
