import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Product name is required'),
  url: yup.string().url('Must be a valid URL').required('URL is required'),
  location: yup.string().required('Location is required'),
  stage: yup.string().required('Stage is required'),
  goals: yup.string().required('Goals are required'),
  discount: yup.string().optional(),
});

const ProductForm: React.FC = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=\