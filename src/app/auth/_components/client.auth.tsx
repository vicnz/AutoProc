"use client";
import { LoginOutlined, QuestionCircleOutlined, UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { icon } from '@/components/shared/logo';
import { pb_client } from "@lib/state/pb/client.config";
import { loginUser } from "@lib/state/user/user";
import { App, Button, Card, Form, FormInstance, Input, Space, Tooltip, Typography, theme } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface ClientAuthProps { }

const { Title, Link } = Typography
const { Password } = Input
const { useToken } = theme
const { useApp } = App
//
export default function ClientAuth({ }: ClientAuthProps) {
    const { token } = useToken()
    const { message } = useApp()
    const router = useRouter();
    const formRef = useRef<FormInstance>(null)
    const [loading, setLoading] = useState(false)
    // const search_params = useSearchParams().get("next");
    // const pathname = usePathname()

    const handleSubmit = async () => {
        // e.preventDefault();
        const username = formRef.current?.getFieldValue('username') as string
        const password = formRef.current?.getFieldValue('password') as string

        setLoading(true)

        if (username.length < 3 || password.length < 3) {
            message.error('Please ')
        }

        try {
            const pb_user = await loginUser({
                pb: pb_client,
                user: username,
                password: password,
            });
            // document.cookie = pb_client.authStore.exportToCookie({ httpOnly: false });
            //@ts-ignore
            message.success(`Welcome, ${pb_user.record?.fname}`, 5)

            //goto
            if (pb_client.authStore.model?.type === 'admin') {
                router.push('/admin')
            } else if (pb_client.authStore.model?.type === 'client') {
                router.push('/clients')
            } else if (pb_client.authStore.model?.type === 'util') {
                router.push('/utility')
            }
            return pb_user;

        } catch (error: any) {
            setLoading(false)
            console.log("error logging in user === ", error.originalError);
            message.error('Login Error, Please Check You Credentials', 5)
        }
    };

    useEffect(() => {
        return () => {
            setLoading(false)
        }
    }, [])


    return (
        <>
            <Form ref={formRef} name="login-form" size='large' layout='vertical' autoComplete='off' requiredMark style={{ width: 'inherit' }}>
                <Space direction='vertical' style={{ width: 'inherit' }}>
                    <Card style={{ borderTop: `solid ${token.colorPrimary} 5px`, width: 'inherit' }}>
                        <Space direction='vertical'>
                            <div style={{ textAlign: 'center' }}>
                                <img src={icon} alt="page-log" style={{ height: '75px' }} />
                                <Title level={4} style={{ color: token.colorPrimary, fontFamily: 'cake sans' }}>E-LOGIN KU</Title>
                            </div>
                            <div>
                                <Form.Item name="username" rules={[{ required: true }]}>
                                    <Input placeholder="Username or Email" prefix={<UserOutlined style={{ color: token.colorPrimary }} />} autoFocus />
                                </Form.Item>
                                <Form.Item name="password" rules={[{ required: true }]}>
                                    <Password type="password" placeholder="Password" prefix={<UnlockOutlined style={{ color: token.colorPrimary }} />} />
                                </Form.Item>
                                <Tooltip title="This is still a TO-DO feature" placement="bottom">
                                    <Link href="#" disabled tabIndex={-1}><QuestionCircleOutlined /> Forgot Password?</Link>
                                </Tooltip>
                            </div>
                        </Space>
                    </Card>
                    <Button type='primary' size='large' block icon={<LoginOutlined />} loading={loading} onClick={() => handleSubmit()}>
                        {
                            loading ? "LOADING" : "LOGIN"
                        }
                    </Button>
                </Space >
            </Form>
        </>
    );
}
