# DevOps Pipeline Project

A complete cloud-native application demonstrating modern DevOps practices including containerization, Kubernetes orchestration, CI/CD automation, and Infrastructure as Code.

## 🚀 Project Overview

This project showcases a production-ready workflow for deploying a Node.js Express application with:

- **Containerization** using Docker and Docker Compose
- **Kubernetes** deployment with high availability (2+ replicas)
- **CI/CD Pipeline** with GitHub Actions
- **Infrastructure as Code** with Terraform (AWS)
- **Code Quality** enforcement with ESLint
- **Monitoring & Observability** with Prometheus and Grafana

## 📋 Table of Contents

- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [Project Structure](#project-structure)
- [CI/CD Pipeline](#cicd-pipeline)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Monitoring with Prometheus & Grafana](#monitoring-with-prometheus--grafana)
- [Terraform Infrastructure](#terraform-infrastructure)
- [Verification & Testing](#verification--testing)
- [Troubleshooting](#troubleshooting)

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Repository                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Source Code  │  │ Dockerfile   │  │  K8s Manifests│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ git push
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  GitHub Actions (CI/CD)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐      │
│  │  Lint    │→ │  Build   │→ │ Push to Registry     │      │
│  │ (ESLint) │  │ (Docker) │  │ (GHCR - optional)    │      │
│  └──────────┘  └──────────┘  └──────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ deploy
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Kubernetes Cluster (Local/Cloud)                │
│  ┌───────────────────────────────────────────────────┐      │
│  │  Service (ClusterIP)                              │      │
│  │  ┌─────────────┐  ┌─────────────┐                │      │
│  │  │   Pod 1     │  │   Pod 2     │                │      │
│  │  │ Express App │  │ Express App │  (Replicas)    │      │
│  │  └─────────────┘  └─────────────┘                │      │
│  └───────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │
┌─────────────────────────────────────────────────────────────┐
│                  AWS (Terraform)                             │
│  ┌──────────────────────────────────────────────────┐       │
│  │  S3 Bucket (versioned, encrypted)                │       │
│  │  - Application logs                              │       │
│  │  - Build artifacts                               │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Technology Stack

| Category             | Technology             | Purpose                                     |
| -------------------- | ---------------------- | ------------------------------------------- |
| **Application**      | Node.js + Express      | Web server with health endpoints            |
| **Containerization** | Docker, Docker Compose | Container runtime and local orchestration   |
| **Orchestration**    | Kubernetes             | Production-grade container orchestration    |
| **CI/CD**            | GitHub Actions         | Automated testing, building, and deployment |
| **IaC**              | Terraform              | AWS infrastructure provisioning             |
| **Code Quality**     | ESLint                 | JavaScript linting and standards            |
| **Monitoring**       | Prometheus + Grafana   | Metrics collection and visualization        |
| **Cloud Provider**   | AWS                    | Cloud infrastructure (S3)                   |

## ✅ Prerequisites

### Required:

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **Docker** ([Download](https://www.docker.com/products/docker-desktop))
- **Docker Compose** (included with Docker Desktop)
- **kubectl** ([Install Guide](https://kubernetes.io/docs/tasks/tools/))
- **Git** ([Download](https://git-scm.com/))

### Optional:

- **Terraform** >= 1.0 ([Download](https://www.terraform.io/downloads))
- **AWS Account** (for Terraform infrastructure)
- **Kubernetes Cluster** (Docker Desktop, Minikube, or cloud)

### Installation on Windows (PowerShell):

```powershell
# Using Chocolatey package manager
choco install nodejs docker-desktop kubernetes-cli terraform git
```

## 🎯 Quick Start

```powershell
# Clone repository
git clone https://github.com/medalichakhari/devops-pipeline-project.git
cd devops-pipeline-project

# Install dependencies
npm install

# Run locally
node app/index.js
# Visit: http://localhost:3000

# Run with Docker Compose
docker-compose up --build
# Visit: http://localhost:3000

# Deploy to Kubernetes
kubectl apply -f k8s/
kubectl port-forward svc/devops-pipeline-demo 3000:3000
# Visit: http://localhost:3000
```

## 📚 Detailed Setup

### 1. Application Setup

```powershell
# Install Node.js dependencies
npm install

# Run linting
npm run lint

# Start application
npm start
```

**Verify:**

- Server should display: `Server listening on port 3000`
- Test endpoints:
  ```powershell
  curl http://localhost:3000/
  curl http://localhost:3000/health
  ```

### 2. Docker Setup

```powershell
# Build Docker image
docker build -t devops-pipeline-demo:local .

# Run container
docker run --rm -p 3000:3000 devops-pipeline-demo:local

# Or use Docker Compose
docker-compose up --build
```

**Verify:**

- Container should start successfully
- Access: `http://localhost:3000/health`

### 3. Kubernetes Deployment

**Enable Kubernetes in Docker Desktop:**

1. Open Docker Desktop → Settings → Kubernetes
2. Check "Enable Kubernetes"
3. Apply & Restart (wait ~2-3 minutes)

**Deploy application:**

```powershell
# Apply all manifests
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -l app=devops-pipeline-demo
kubectl get svc devops-pipeline-demo
kubectl get deployment devops-pipeline-demo

# Port forward to access locally
kubectl port-forward svc/devops-pipeline-demo 3000:3000
```

**Verify:**

- 2 pods should be in `Running` state
- Service should be `ClusterIP` type
- Access: `http://localhost:3000/health`

**Useful commands:**

```powershell
# View logs
kubectl logs -l app=devops-pipeline-demo --tail=50

# Scale replicas
kubectl scale deployment devops-pipeline-demo --replicas=3

# Describe resources
kubectl describe deployment devops-pipeline-demo

# Delete deployment
kubectl delete -f k8s/
```

### 4. CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) automatically runs on:

- Push to `main` or `develop` branches
- Pull requests to `main`

**Workflow steps:**

1. **Lint Job**: Runs ESLint code quality checks
2. **Build Job**: Builds and tests Docker image
3. **Push Job** (optional): Pushes to GitHub Container Registry

**View workflow runs:**

```
https://github.com/medalichakhari/devops-pipeline-project/actions
```

**Local testing (simulate CI):**

```powershell
# Run lint
npm run lint

# Build Docker image
docker build -t test-ci .
```

### 5. Terraform Infrastructure (Optional)

**Prerequisites:**

- AWS Account
- AWS CLI configured (`aws configure`)

**Setup:**

```powershell
cd terraform

# Initialize Terraform
terraform init

# Validate configuration
terraform validate

# Preview changes
terraform plan

# Apply infrastructure
terraform apply
# Type 'yes' to confirm

# View outputs
terraform output

# Destroy resources (cleanup)
terraform destroy
```

**What gets created:**

- S3 bucket with versioning
- Public access blocking (security)
- Server-side encryption (AES256)
- Resource tagging

See [terraform/README.md](terraform/README.md) for detailed documentation.

## 📁 Project Structure

```
devops-pipeline-project/
├── app/
│   ├── index.js                 # Express application
│   └── metrics.js               # Prometheus metrics middleware
├── k8s/
│   ├── deployment.yaml          # K8s deployment (2 replicas)
│   ├── service.yaml             # K8s service (ClusterIP)
│   ├── ingress.yaml             # K8s ingress (optional)
│   ├── prometheus.yaml          # Prometheus server deployment
│   └── grafana.yaml             # Grafana dashboard deployment
├── monitoring/
│   └── grafana-dashboard.json   # Pre-configured Grafana dashboard
├── terraform/
│   ├── main.tf                  # AWS infrastructure
│   ├── variables.tf             # Input variables
│   ├── outputs.tf               # Output values
│   ├── .gitignore               # Terraform-specific ignores
│   └── README.md                # Terraform documentation
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions pipeline
├── Dockerfile                   # Multi-stage Docker build
├── docker-compose.yml           # Local development setup
├── .dockerignore                # Docker build exclusions
├── .gitignore                   # Git exclusions
├── eslint.config.js             # ESLint configuration
├── package.json                 # Node.js dependencies
└── README.md                    # This file
```

## 🔄 CI/CD Pipeline

### Workflow Triggers:

- `push` to `main` or `develop`
- `pull_request` to `main`

### Jobs:

#### 1. Lint Job

```yaml
- Checkout code
- Setup Node.js 18
- Install dependencies (npm ci)
- Run ESLint
```

#### 2. Build Job

```yaml
- Checkout code
- Setup Docker Buildx
- Build Docker image
- Test container health endpoint
```

#### 3. Push Job (Optional)

```yaml
- Login to GitHub Container Registry
- Build and push image with tags:
    - latest
    - commit SHA
```

**Enable GHCR push:**

1. Uncomment the `push` job in `.github/workflows/ci.yml`
2. No additional secrets needed (`GITHUB_TOKEN` is automatic)

## ☸️ Kubernetes Deployment

### Resources:

**Deployment:**

- 2 replicas (high availability)
- Health checks (liveness + readiness probes)
- Resource limits (CPU: 500m, Memory: 256Mi)
- Rolling update strategy

**Service:**

- Type: ClusterIP (internal)
- Port: 3000
- Selector: `app=devops-pipeline-demo`

**Ingress (optional):**

- Commented out by default
- Requires Ingress Controller (nginx-ingress)
- Configure domain and TLS

### Common Operations:

```powershell
# Check pod status
kubectl get pods -w

# Get pod logs
kubectl logs -f <pod-name>

# Execute command in pod
kubectl exec -it <pod-name> -- /bin/sh

# Update deployment (new image)
kubectl set image deployment/devops-pipeline-demo app=new-image:tag

# Rollback deployment
kubectl rollout undo deployment/devops-pipeline-demo

# View deployment history
kubectl rollout history deployment/devops-pipeline-demo
```

## 📊 Monitoring with Prometheus & Grafana

### Overview

The project includes a complete monitoring stack with:

- **Prometheus** - Metrics collection and time-series database
- **Grafana** - Visualization and dashboards
- **prom-client** - Node.js metrics instrumentation

### Metrics Collected

**Application Metrics:**

- `http_requests_total` - Total HTTP requests by method, route, and status
- `http_request_duration_seconds` - Request latency histogram
- `active_connections` - Current active connections

**System Metrics:**

- `process_cpu_seconds_total` - CPU usage
- `nodejs_heap_size_used_bytes` - Memory usage
- `nodejs_heap_size_total_bytes` - Total heap size
- `process_uptime_seconds` - Application uptime

### Setup Monitoring

**1. Create monitoring namespace:**

```powershell
kubectl create namespace monitoring
```

**2. Deploy Prometheus and Grafana:**

```powershell
kubectl apply -f k8s/prometheus.yaml
kubectl apply -f k8s/grafana.yaml

# Wait for pods to be ready
kubectl get pods -n monitoring -w
```

**3. Access Prometheus:**

```powershell
kubectl port-forward -n monitoring svc/prometheus 9090:9090
```

Visit: `http://localhost:9090`

**Try these queries:**

- `http_requests_total` - Total requests
- `rate(http_requests_total[1m])` - Requests per second
- `histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))` - 95th percentile latency

**4. Access Grafana:**

```powershell
kubectl port-forward -n monitoring svc/grafana 3001:3000
```

Visit: `http://localhost:3001`

**Login credentials:**

- Username: `admin`
- Password: `admin`

### Import Dashboard

1. In Grafana, click **+ → Import**
2. Upload `monitoring/grafana-dashboard.json`
3. Select Prometheus datasource
4. Click **Import**

**Dashboard includes:**

- Request rate (req/sec)
- Request duration (P50, P95)
- Total requests counter
- Active connections
- Memory usage
- CPU usage
- HTTP status codes

### Generate Test Traffic

```powershell
# Generate continuous traffic
while ($true) {
  curl http://localhost:3000/ -UseBasicParsing | Out-Null
  curl http://localhost:3000/health -UseBasicParsing | Out-Null
  Start-Sleep -Milliseconds 500
}
```

Press Ctrl+C to stop. Refresh Grafana to see real-time metrics!

### Monitoring Architecture

```
┌─────────────────────────────────────────────────┐
│           Kubernetes Cluster                     │
│                                                   │
│  ┌──────────────┐         ┌─────────────────┐   │
│  │  App Pods    │         │   Prometheus    │   │
│  │ /metrics     │────────→│   (scraper)     │   │
│  │  :3000       │ scrape  │   :9090         │   │
│  └──────────────┘         └─────────────────┘   │
│                                    │             │
│                                    │ datasource  │
│                            ┌───────▼─────────┐   │
│                            │    Grafana      │   │
│                            │  (dashboards)   │   │
│                            │    :3000        │   │
│                            └─────────────────┘   │
└─────────────────────────────────────────────────┘
```

## 🌩️ Terraform Infrastructure

### AWS Resources:

1. **S3 Bucket**
   - Versioning: Enabled
   - Encryption: AES256
   - Public access: Blocked
   - Naming: `{project}-{env}-bucket`

### Variables:

| Variable       | Default                | Description        |
| -------------- | ---------------------- | ------------------ |
| `aws_region`   | `us-east-1`            | AWS region         |
| `environment`  | `dev`                  | Environment name   |
| `project_name` | `devops-pipeline-demo` | Project identifier |

### Outputs:

After `terraform apply`:

- `bucket_name`: S3 bucket identifier
- `bucket_arn`: Amazon Resource Name
- `bucket_region`: Deployment region

## ✔️ Verification & Testing

### Application Tests:

```powershell
# Test root endpoint
curl http://localhost:3000/
# Expected: JSON with welcome message

# Test health endpoint
curl http://localhost:3000/health
# Expected: {"status":"ok"}
```

### Docker Tests:

```powershell
# Build and run
docker build -t test .
docker run -d -p 3000:3000 --name test-app test

# Test endpoints
curl http://localhost:3000/health

# Check logs
docker logs test-app

# Cleanup
docker stop test-app && docker rm test-app
```

### Kubernetes Tests:

```powershell
# Check all resources
kubectl get all -l app=devops-pipeline-demo

# Verify pods are running
kubectl get pods -l app=devops-pipeline-demo
# Expected: 2/2 Running

# Test service connectivity
kubectl port-forward svc/devops-pipeline-demo 3000:3000
curl http://localhost:3000/health

# Check resource usage
kubectl top pods -l app=devops-pipeline-demo
```

### CI/CD Tests:

```powershell
# Simulate lint job
npm run lint

# Simulate build job
docker build -t ci-test .

# Test the built image
docker run -d -p 3000:3000 ci-test
sleep 5
curl http://localhost:3000/health
```

## 🔧 Troubleshooting

### Application Issues:

**Port already in use:**

```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (use PID from above)
taskkill /PID <PID> /F
```

**Dependencies not installing:**

```powershell
# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Docker Issues:

**Build failures:**

```powershell
# Build without cache
docker build --no-cache -t devops-pipeline-demo:local .

# Check Docker daemon
docker version
docker info
```

**Container not starting:**

```powershell
# View container logs
docker logs <container-id>

# Inspect container
docker inspect <container-id>
```

### Kubernetes Issues:

**Pods not starting:**

```powershell
# Describe pod for events
kubectl describe pod <pod-name>

# Check pod logs
kubectl logs <pod-name>

# Check if image exists locally
docker images | grep devops-pipeline-demo
```

**ImagePullBackOff error:**

```powershell
# For local images, ensure imagePullPolicy: IfNotPresent
# Or load image into cluster:
kind load docker-image devops-pipeline-demo:local  # for kind
minikube image load devops-pipeline-demo:local     # for minikube
```

**Service not accessible:**

```powershell
# Check service endpoints
kubectl get endpoints devops-pipeline-demo

# Test from within cluster
kubectl run test-pod --rm -it --image=busybox -- wget -O- http://devops-pipeline-demo:3000/health
```

### Terraform Issues:

**No valid credential sources:**

```powershell
# Configure AWS credentials
aws configure

# Verify credentials
aws sts get-caller-identity
```

**State locked:**

```powershell
# If using remote state with locking
terraform force-unlock <lock-id>
```

## 📖 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Express.js Documentation](https://expressjs.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Mohamed Ali Chakhari**

- GitHub: [@medalichakhari](https://github.com/medalichakhari)

---

## 🎯 Learning Outcomes

This project demonstrates proficiency in:

✅ **Containerization** - Multi-stage Dockerfiles, optimization  
✅ **Orchestration** - Kubernetes deployments, services, scaling  
✅ **CI/CD** - Automated testing, building, deployment pipelines  
✅ **Infrastructure as Code** - Terraform for cloud provisioning  
✅ **Cloud Services** - AWS S3, IAM, resource management  
✅ **Monitoring & Observability** - Prometheus metrics, Grafana dashboards  
✅ **Security** - Encryption, access control, RBAC, secret management  
✅ **DevOps Best Practices** - Version control, documentation, testing

---

**⭐ If you found this project helpful, please give it a star!**
