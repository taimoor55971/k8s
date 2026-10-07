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

the DATABASE_URL secret (crud-app-secret) is NOT stored in git. It is created
from a direct value at deploy time, before the deployment is applied
(replace <NEON_DATABASE_URL> with the real connection string):

kubectl apply -f task2/configmap.yml
kubectl create secret generic crud-app-secret --from-literal=DATABASE_URL='<NEON_DATABASE_URL>'
kubectl apply -f task2/deployment.yml
kubectl apply -f task2/service.yml

(to change the value later, delete and recreate the secret, then run
kubectl rollout restart deployment/nginx-deployment-task2)

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
- kubectl describe secret crud-app-secret

and to check the configmaps and secrets within pods:
- kubectl exec <pod-name> -- env

to edit configmap:
- kubectl edit configmap nginx-config

to edit secret:
- kubectl edit secret crud-app-secret


and to apply the changes rollout:
- kubectl rollout restart deployment/nginx-deployment-task2



to check the service in browser:
- kubectl port-forward svc/nginx-service-task2 8080:80


