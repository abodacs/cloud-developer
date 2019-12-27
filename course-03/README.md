# Section: Monolith to Microservices at Scale
## Project: Refactor Udagram app into Microservices and Deploy

[![Build Status](https://travis-ci.org/abodacs/cloud-developer.svg?branch=master)](https://travis-ci.org/abodacs/cloud-developer)

### 
(screenshots) folder contains screenshots of builds

**Docker Hub**: https://hub.docker.com/u/abodacs



### To setup the application

****Using docker****

The necessary docker images are available on [docker hub](https://hub.docker.com/u/abodacs)
1. Build the docker images

` docker-compose -f udacity-c3-deployment/docker/docker-compose-build.yaml build --parallel`

2. Run the container

`docker-compose up`

Access the frontend in the browser with url http://localhost:8100

Access the API via postman using http://localhost:8080/api/v0


**Using kubernetes**
### Secrets and ConfigMaps to set
In order to run the application on Kuberenetes you need to edit the following files with your specific settings/env variables:\
	udacity-c3-deployment/k8s/aws-secret.yaml\
	udacity-c3-deployment/k8s/env-configmap.yaml\
	udacity-c3-deployment/k8s/env-secret.yaml
	
0) Set up a relational database (e.g. RDS for AWS) and storage (e.g. S3 for AWS) for the application to use.  Update (env-secret.yaml), (env-configmap.yaml), and (aws-secret.yaml) with appropriate configuration.

1) Install Kubernetes (method has been [kops](https://github.com/kubernetes/kops/blob/master/docs/aws.md) on AWS).

I also added a helper setup script k8_setup.sh but you need to manually export these env variables before running it (`sh k8_setup.sh`).

  - POSTGRESS_USERNAME
  - POSTGRESS_PASSWORD
  - POSTGRESS_DB
  - POSTGRESS_HOST
  - URL=http://localhost:8100
  - AWS_REGION
  - AWS_PROFILE
  - AWS_BUCKET
  - JWT_SECRET
  - AWS_ACCESS_KEY_ID
  - AWS_SECRET_ACCESS_KEY
  - NAME
  - KOPS_STATE_STORE

2) Deploy Kubernetes (I created a script, k8_setup_deploy.sh, to help deploy needed Kubernetes deployments, services, secrets, configmaps, etc.)
`sh k8_setup_deploy.sh`
3) Expose application on localhost (by default)

### To expose applicaton on localhost
Expose the frontend service to port 8100 using:
`kubectl port-forward service/frontend 8100:8100`

Expose the backend service to port 8080 using:
`kubectl port-forward service/reverseproxy 8080:8080`

Then you can view it on your web browser on:
http://localhost:8100


> In case you needed to debug one the pods that are not running well, the following commands might help

`kubectl get pods` # check if all services are running\
`kubectl logs podName`\
`kubectl logs --follow podName`\
`kubectl get all`\
`kubectl describe deployments/backend-feed`


**Scaling the application**

Scaling the app up/down can be done using

`kubectl scale deployment/backend-feed --replicas 1`