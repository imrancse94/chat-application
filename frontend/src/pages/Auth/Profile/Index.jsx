import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Profile from "./Profile";
import { Suspense } from "react";
import Loader from '@/components/Include/Loader';


const Index = () => {

    return (
        <div>
            <Breadcrumb pageName="User Profile" />
            <Suspense fallback={<Loader />}>
                <Profile />
            </Suspense>
        </div>
    );
}

export default Index;