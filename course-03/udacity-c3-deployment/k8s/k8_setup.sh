#!/bin/bash

aws s3api create-bucket --bucket ${KOPS_STATE_STORE} --region us-east-1;
aws s3api put-bucket-versioning --bucket ${KOPS_STATE_STORE} --versioning-configuration Status=Enabled
aws s3api put-bucket-encryption --bucket ${KOPS_STATE_STORE} --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'

kops create cluster --zones us-east-1a ${NAME}
kops update cluster ${NAME} --yes