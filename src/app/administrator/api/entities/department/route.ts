export const revalidate = 0;
import { NextRequest } from "next/server";
import { getPickedDepartments, getPickedSections } from './utility'
export const GET = async (req: NextRequest) => {
    const param = req.nextUrl.searchParams

    if (param.get('department') === 'true' && param.get('pick_only') === 'true') {
        return await getPickedDepartments(req)
    }

    if (param.get('section') === 'true' && param.get('pick_only') === 'true') {
        const deptId = param.get('dept_id')
        return await getPickedSections(req, deptId as string)
    }
}


//TODO POST, PUT, PATCH, DELETE