import { FC, useContext, useState } from 'react'
import TopMenu from '../../components/PA/Top_menu/TopMenu';
import SideMenu from '../../components/PA/Aside_menu/SideMenu';
import MainContent from './MainContent';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import UnAuthorization from '../statusPages/UnAuthorization';
import Loader from '../Loader/Loader';
import PhotoEditor from '../../components/PA/PhotoEditor/PhotoEditor';
import styles from './PersonalPage.module.css'

export enum ContentCategory{
    Main,
    Timetable,
    Courses,
    Projects,
    CodeReview,
    LessonRecordings,
    Messenger,
    CourseCatalog,
    Bonuses,
    Certificates,
    Settings,
    Activities
}

const PersonalPage: FC = () => {

    const { store } = useContext(Context);
    const [editingAvatar, setEditingAvatar] = useState(false);
    const startEditing = () => { setEditingAvatar(!editingAvatar) }
    const [superMode, setSuperMode] = useState('user');
    const [activeContentCategory, setActiveContentCategory] = useState<number>(ContentCategory.Main)

    if (store.isLoading) {
        return <Loader />
    }
    if (store.isAuth && store.user.isActivated) {
        return (<>
            {editingAvatar && <PhotoEditor editingAvatar={startEditing} />}
            <TopMenu mode={superMode} setMode={setSuperMode} setActiveContentCategory = {setActiveContentCategory}/>
            <div className={styles.main__body}>
                <SideMenu
                    userData={store.user}
                    editingAvatar={startEditing}
                    avatarUrl={store.user.avatar}
                    setActiveContentCategory = {setActiveContentCategory}
                    editingMode={editingAvatar}
                    mode={superMode}
                />
                <MainContent activeContentCategory={activeContentCategory} setActiveContentCategory = {setActiveContentCategory}/>
            </div>
        </>)
    }

    return (
        <UnAuthorization />
    )
}

export default observer(PersonalPage)