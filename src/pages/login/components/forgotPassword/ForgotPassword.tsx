import React, { useState } from 'react'
import { Button, Divider, Steps } from 'antd'
import './forgotPassword.style.scss'
import { useHistory } from 'react-router-dom'
import { isLogin } from '../../login.utils'
import { FirstStep } from './components/FirstStep'
import { SecondStep } from './components/SecondStep'
import { ThirdStep } from './components/ThirdStep'
import LoginBackground from '../../../../assets/login/bg.svg'

const { Step } = Steps

const ForgotPassword = () => {
  const history = useHistory()

  if (isLogin()) {
    history.push('/')
  }

  const [current, setCurrent] = useState(0)
  const [email, setEmail] = useState('')
  const [otpCode, setOtpCode] = useState('')

  const next = () => setCurrent(current + 1)

  const prev = () => setCurrent(current - 1)

  const steps = [
    {
      title: 'ایمیل',
      content: <FirstStep toNextStep={next} setEmail={setEmail} />,
    },
    {
      title: 'تایید',
      content: <SecondStep toNextStep={next} email={email} setOtpCode={setOtpCode} />,
    },
    {
      title: 'رمز جدید',
      content: <ThirdStep toPrevStep={prev} email={email} otpCode={otpCode} />,
    },
  ]

  return (
    <div>
      {/* <img className='login-react antdesign-full-logo' src={<></>} alt='logo' /> */}
      <div className='forgot-password'>
        <div className='login-holder'>
          <img className='login-holder--info' src={LoginBackground} alt='bg' />
        </div>
        <div className='form'>
          <div className='form-title'>
            <div className='form-title--text'>فراموشی رمز عبور</div>
          </div>
          <Steps className='forgot-password-steps' current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>

          <div className='steps-content'>{steps[current].content}</div>
          {current > 0 && <Divider />}
          <div className='steps-action' style={{ display: 'grid' }}>
            {current > 0 && (
              <>
                <Button onClick={() => prev()}>Previous</Button>
                <Button type='text' onClick={() => history.push('/login')} className='secondary-button'>
                  ورود
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
