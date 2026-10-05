Instructions For task 1:
apply the following files in order:
- deployment.yml
- service.yml

kubectl apply -f deployment.yml
kubectl apply -f service.yml

to check the deployment:
- kubectl get deployments

to check the pods:
- kubectl get pods

to check the service:
- kubectl get services


to check the service in browser:
- minikube service nginx-service



Instructions For task 2:

apply the following files in order:
- configmap.yml
- secret.yml
- deployment.yml
- service.yml

to check the deployment:
- kubectl get deployments

to check the pods:
- kubectl get pods

to check the service:
- kubectl get services

to check the configmap:
- kubectl get configmap

to check the secret:
- kubectl get secret


for detailed information of configmap and secret:
- kubectl describe configmap nginx-config
- kubectl describe secret nginx-secret

and to check the configmaps and secrets within pods:
- kubectl exec <pod-name> -- env

to edit configmap:
- kubectl edit configmap nginx-config

to edit secret:
- kubectl edit secret nginx-secret


and to apply the changes rollout:
- kubectl rollout restart deployment/nginx-deployment-task2



to check the service in browser:
- minikube service nginx-service-task2


