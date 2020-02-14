import React from 'react'

import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset,
} from '@uform/antd'
import PageHeaderWrapper from "@/pro-layout/PageHeaderWrapper";

const UFormVerificationDemo = () => (
  <PageHeaderWrapper content="uform 验证示例">
    <SchemaForm
      onSubmit={v => console.log(v)}
      labelCol={6}
      wrapperCol={6}>
      <Field type="string" name="name" title="姓名" required/>
      <Field type="string" name="nickname" title="昵称" required/>
      <Field
        type="date"
        name="birthday"
        title="生日"
        description="试试选择2018-11-30"
        x-rules={[
          val =>
            new Promise(resolve => {
              setTimeout(() => {
                if (val === '2018-11-30') {
                  resolve('不允许输入2018-11-30')
                } else {
                  resolve()
                }
              }, 1000)
            })
        ]}
        required
      />
      <Field
        type="string"
        name="phone"
        x-rules="phone"
        title="手机号"
        required
      />
      <Field type="string" name="qq" x-rules="qq" title="QQ号" required/>
      <Field type="string" name="email" x-rules="email" title="邮箱" required/>
      <Field
        type="string"
        name="home"
        x-rules="url"
        title="个人主页地址"
        required
      />
      <Field
        type="string"
        name="money"
        x-rules="money"
        title="月薪"
        x-props={{placeholder: '¥100,000', addonAfter: '元'}}
        required
      />
      <Field
        type="string"
        name="idcard"
        x-rules="idcard"
        title="身份证"
        required
      />
      <Field type="string" name="zip" x-rules="zip" title="邮政编码" required/>
      <Field
        type="string"
        name="custom"
        x-rules={val =>
          new Promise(resolve => {
            setTimeout(() => {
              if (val === '123') {
                resolve('不允许输入123')
              } else {
                resolve()
              }
            }, 1000)
          })
        }
        title="自定义校验规则"
        required
      />
      <FormButtonGroup offset={6}>
        <Submit/>
        <Reset/>
      </FormButtonGroup>
    </SchemaForm>
  </PageHeaderWrapper>
)

export default UFormVerificationDemo
