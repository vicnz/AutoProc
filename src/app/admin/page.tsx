import LandingLayout from './_components/landing'
import { server_component_pb } from '@lib/state/pb/server.component'
import { cookies } from 'next/headers'

export default async function () {
    const { pb } = await server_component_pb(cookies().get('pb_auth'))
    const result = await pb.collection('clients').getList(1, undefined, { filter: "type != 'admin'" })

    return (
        <LandingLayout>
            <h1 style={{ textAlign: 'center', textTransform: 'uppercase', color: "#C0252A" }}>Welcome Back {pb.authStore.model?.fname}!</h1>
            {
                result.items.map(item => {
                    return (
                        <p key={item.id}>{item?.username}</p>
                    )
                })
            }
        </LandingLayout>
    )
}