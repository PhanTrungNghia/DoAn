import { Typography } from 'antd';
import '../../App.css'
import { useSelector, shallowEqual } from 'react-redux';

const AppFooter = () => {
    const authUser: IUser = useSelector(
        (state: any) => state.auth.user,
        shallowEqual
    )
    if (!authUser) return null;
    return (
        <div className='AppFooter'>
            <Typography.Link href='tel:+123456789'>+123456789</Typography.Link>
            <Typography.Link href='https://www.google.com/' target="_blank">Privacy Policy</Typography.Link>
            <Typography.Link href='https://www.google.com/'target="_blank">Terms of use</Typography.Link>
        </div>
    )
}

export default AppFooter;