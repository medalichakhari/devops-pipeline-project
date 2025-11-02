# Output values after Terraform apply

output "bucket_name" {
  description = "Name of the created S3 bucket"
  value       = aws_s3_bucket.demo_bucket.id
}

output "bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.demo_bucket.arn
}

output "bucket_region" {
  description = "Region where the bucket was created"
  value       = aws_s3_bucket.demo_bucket.region
}
