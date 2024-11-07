import { FC, useContext,useState } from "react";
import TopMenu from "./top_menu/TopMenu";
import { Context } from "../..";
import {ContentCategory} from '../../pages/personal_page/PersonalPage'
import Loader from "../../pages/Loader/Loader";
import MainContent from "./MainContent";
import { observer } from "mobx-react-lite";




const PersonalPageMobile: FC = () => {
    const {store} = useContext(Context);
    const [activeContentCategory, setActiveContentCategory] = useState<number>(ContentCategory.Main);


    if (store.isLoading) {
        return <Loader />
    }
    return (
        <div>
            <TopMenu avatarUrl={store.user.avatar}/>
            <MainContent activeContentCategory={activeContentCategory}/>
        </div>
    )
}

export default observer(PersonalPageMobile);