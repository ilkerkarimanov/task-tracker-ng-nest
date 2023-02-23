### kubectl apply commands in order

    kubectl apply -f mysql-configmap.yaml    
    kubectl apply -f mysql-secret.yaml
    kubectl apply -f mysql.yaml
    kubectl apply -f task-web-api-configmap.yaml 
    kubectl apply -f task-web-api.yaml
    kubectl apply -f task-web-ui-configmap.yaml
    kubectl apply -f task-nginx-configmap.yaml
    kubectl apply -f task-web-ui.yaml

### kubectl get commands

    kubectl get pod
    kubectl get pod --watch
    kubectl get pod -o wide
    kubectl get service
    kubectl get secret
    kubectl get all | grep mongodb

### kubectl debugging commands

    kubectl describe pod mongodb-deployment-xxxxxx
    kubectl describe service mongodb-service
    kubectl logs mongo-express-xxxxxx

### give a URL to external service in minikube

    minikube service mongo-express-service