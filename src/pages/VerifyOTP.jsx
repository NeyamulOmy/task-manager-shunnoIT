import axios from 'axios';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input'
import { useNavigate } from 'react-router-dom';
const VerifyOTP = () => {
    const otpEmail = localStorage.getItem('otpEmail')
    const baseURL = process.env.REACT_APP_baseURL;
    const [otpState, setOtpState] = useState('')
    const navigate = useNavigate()
    const handleVerify = () => {

        console.log(otpState)
        axios.get(`${baseURL}/user/verifyOtp/${otpEmail}/${otpState}`)
            .then(res => {
                if (res.status === 200)
                    localStorage.setItem('otpCode', otpState)
                return navigate('/new-password')

            })

    }
    return (
        <div className='min-vh-100'>
            <h4>Verify OTP</h4>
            <div className='d-flex justify-content-center'>
                <OtpInput
                    numInputs={6}
                    value={otpState}
                    onChange={setOtpState}
                    otpType='alphanumeric'
                    separator={<span>-</span>}
                />

            </div>
            <div className='my-3'>
                <button onClick={handleVerify}>Verify</button>
            </div>
        </div>
    );
};

export default VerifyOTP;