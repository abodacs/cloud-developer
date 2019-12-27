# Section: Monolith to Microservices at Scale
## Project: Refactor Udagram app into Microservices and Deploy

### Links
**Docker Hub**: https://hub.docker.com/u/abodacs

### Secrets and ConfigMaps to set
In order to run the application on Kuberenetes you need to edit the following files with your specific settings/env variables:
	udacity-c3-deployment/k8s/aws-secret.yaml
	udacity-c3-deployment/k8s/env-configmap.yaml
	udacity-c3-deployment/k8s/env-secret.yaml

### To setup the application
0) Set up a relational database (e.g. RDS for AWS) and storage (e.g. S3 for AWS) for the application to use.  These settings will populate the secret and configmap yaml files listed above.

1) Install Kubernetes (my preferred method has been [kops](https://github.com/kubernetes/kops/blob/master/docs/aws.md) on AWS).

I also added a helper setup script k8setup.sh but you need to manually export these env variables before running it.
<ul>
<li>AWS_ACCESS_KEY_ID</li>
<li>AWS_SECRET_ACCESS_KEY</li>
<li>NAME</li>
<li>KOPS_STATE_STORE</li>
</ul>

2) Deploy Kubernetes (I created a script, k8_setup_deploy.sh, to help deploy needed Kubernetes deployments, services, secrets, configmaps, etc.)
3) Expose application on localhost (by default)

### To expose applicaton on localhost
Expose the frontend service to port 8100 using:
`kubectl port-forward service/frontend 8100:8100`

Expose the backend service to port 8080 using:
`kubectl port-forward service/reverseproxy 8080:8080`

Then you can view it on your web browser on:
http://localhost:8100


> In case you needed to debug one the pods that are not running well, the following commands might help

`kubectl logs podName`
`kubectl logs --follow podName`
`kubectl get all`
`kubectl describe deployments/backend-feed`