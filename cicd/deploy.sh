#!/bin/sh
set -e

VERSION=$1
ENVIROMENT=$2
SERVICE=$3
NAMESPACE=$4

echo "Run ioc-management-system-fe"
sed -i -e "s,__SERVICE_VERSION__,$VERSION,g" cicd/$ENVIROMENT/$SERVICE-deployment.yaml
#sudo kubectl -n $NAMESPACE delete -f cicd/$ENVIROMENT/$SERVICE-deployment.yaml --kubeconfig=cicd/$ENVIROMENT/k8s-config --ignore-not-found


#sudo kubectl -n $NAMESPACE apply -f cicd/$ENVIROMENT/$SERVICE-pv-nfs.yaml --kubeconfig=cicd/$ENVIROMENT/k8s-config
#sudo kubectl -n $NAMESPACE apply -f cicd/$ENVIROMENT/$SERVICE-pvc-nfs.yaml --kubeconfig=cicd/$ENVIROMENT/k8s-config
kubectl -n $NAMESPACE apply -f cicd/$ENVIROMENT/$SERVICE-deployment.yaml --kubeconfig=cicd/$ENVIROMENT/k8s-config
kubectl -n $NAMESPACE apply -f cicd/$ENVIROMENT/$SERVICE-svc.yaml --kubeconfig=cicd/$ENVIROMENT/k8s-config
# sudo kubectl -n $NAMESPACE apply -f cicd/$ENVIROMENT/$SERVICE-hpa.yaml --kubeconfig=cicd/$ENVIROMENT/k8s-config

echo  'Waiting for deploy'
sleep 20