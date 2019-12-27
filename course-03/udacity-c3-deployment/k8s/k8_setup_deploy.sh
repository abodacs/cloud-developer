#!/bin/bash
kubectl create -f aws-secret.yaml 
kubectl create -f env-configmap.yaml 
kubectl create -f env-secret.yaml

kubectl apply -f backend-feed-service.yaml 
kubectl apply -f backend-user-service.yaml 
kubectl apply -f frontend-service.yaml 
kubectl apply -f reverseproxy-service.yaml

kubectl apply -f backend-feed-deployment.yaml 
kubectl apply -f backend-user-deployment.yaml 
kubectl apply -f frontend-deployment.yaml 
kubectl apply -f reverseproxy-deployment.yaml