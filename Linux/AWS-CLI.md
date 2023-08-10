---  
title: AWS-CLI.md    
permalink: Linux/AWS-CLI    
category:  Linux    
parent:   Linux    
layout: default    
has_children: false    
share: true    
shortRepo:    
  - linux    
  - default    
---  
    
    
<br/>    
    
<details markdown="block">    
<summary>    
Table of contents    
</summary>    
{: .text-delta }    
1. TOC    
{:toc}    
</details>    
    
<br/>    
    
***    
    
<br/>    
    
# Database Stuff    
    
> some scripts use jq for parsing json    
    
> get db instances    
    
```shell    
aws rds describe-db-instances \                                                      
  --filters "Name=engine,Values=mysql" \                      
  --query "*[].[DBInstanceIdentifier,Endpoint.Address,Endpoint.Port,MasterUsername]"    
```    
    
> configure    
    
```shell    
aws configure    
```    
    
# create IAM user    
    
```shell    
aws iam create-group --group-name Administrators    
aws iam create-user --user-name Administrator    
aws iam add-user-to-group --user-name Administrator --group-name Administrators    
aws iam attach-group-policy --group-name Administrators --policy-arn $(aws iam list-policies --query 'Policies[?PolicyName==`AdministratorAccess`].{ARN:Arn}' --output text)    
aws iam create-access-key --user-name Administrator    
```    
    
# Create VPC, security group, subnets and subnet group (optional) with jq (https://stedolan.github.io/jq/)    
    
```shell    
# VPC, internet gateway and route table    
export VPC_ID=$(aws ec2 create-vpc --cidr-block 10.0.0.0/16 | jq -r '.Vpc.VpcId')    
export IG_ID=$(aws ec2 create-internet-gateway | jq -r '.InternetGateway.InternetGatewayId')    
aws ec2 attach-internet-gateway --internet-gateway-id $IG_ID --vpc-id $VPC_ID    
aws ec2 modify-vpc-attribute --enable-dns-hostnames --vpc-id $VPC_ID    
export RT_ID=$(aws ec2 describe-route-tables --filters "Name=vpc-id,Values=$VPC_ID" --query "RouteTables[].RouteTableId" --output text)    
aws ec2 create-route --route-table-id $RT_ID --destination-cidr-block 0.0.0.0/0 --gateway-id $IG_ID    
    
# Security group    
aws ec2 create-security-group --group-name crud-data-aws-db-create-micro-person-sg --description "Security Group for the Micronaut MySQL guide" --vpc-id $VPC_ID    
export SG_ID=$(aws ec2 describe-security-groups --query 'SecurityGroups[?GroupName==`crud-data-aws-db-create-micro-person-sg`].GroupId' --output text)    
aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 3306 --cidr $(curl ifconfig.me)/32    
    
# Subnets and subnet group    
export AZ_0=$(aws ec2 describe-availability-zones --filters "Name=state,Values=available" --query "AvailabilityZones[0].ZoneName" --output text)    
export AZ_1=$(aws ec2 describe-availability-zones --filters "Name=state,Values=available" --query "AvailabilityZones[1].ZoneName" --output text)    
export SN0_ID=$(aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.0.0/20 --availability-zone $AZ_0 | jq -r '.Subnet.SubnetId')    
export SN1_ID=$(aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.16.0/20 --availability-zone $AZ_1 | jq -r '.Subnet.SubnetId')    
aws ec2 modify-subnet-attribute --subnet-id $SN0_ID --map-public-ip-on-launch    
aws ec2 modify-subnet-attribute --subnet-id $SN1_ID --map-public-ip-on-launch    
aws rds create-db-subnet-group --db-subnet-group-name crud-data-aws-db-create-micro-person-sng --db-subnet-group-description "DB subnet group for the Micronaut MySQL guide" --subnet-ids "$SN0_ID" "$SN1_ID"    
```    
    
# create mysql db instance    
    
```shell    
aws rds create-db-instance \    
    --db-instance-identifier crud-data-aws-db-create-micro-person \    
    --db-instance-class db.t2.micro \    
    --engine mysql \    
    --master-username admin \    
    --master-user-password secret99 \    
    --allocated-storage 20 \    
    --publicly-accessible \    
#    --db-subnet-group-name crud-data-aws-db-create-micro-person-sng \    
#    --vpc-security-group-ids $SG_ID \    
```    
    
## wait for instance    
    
```shell    
aws rds wait db-instance-available --db-instance-identifier crud-data-aws-db-create-micro-person    
```    
    
## stop aws instance    
    
```shell    
aws rds delete-db-instance --db-instance-identifier crud-data-aws-db-create-micro-person --skip-final-snapshot    
aws rds wait db-instance-deleted --db-instance-identifier crud-data-aws-db-create-micro-person    
```    
    
# remove security ec2 instances    
    
```shell    
aws ec2 delete-subnet --subnet-id $SN0_ID    
aws ec2 delete-subnet --subnet-id $SN1_ID    
aws rds delete-db-subnet-group --db-subnet-group-name crud-data-aws-db-create-micro-person-sng    
aws ec2 delete-security-group --group-id $SG_ID    
aws ec2 detach-internet-gateway --internet-gateway-id $IG_ID --vpc-id $VPC_ID    
aws ec2 delete-internet-gateway --internet-gateway-id $IG_ID    
aws ec2 delete-vpc --vpc-id $VPC_ID    
```