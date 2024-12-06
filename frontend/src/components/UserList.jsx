import useAxios from "@/hooks/useAxios"
import useChat from "@/hooks/useChat"
import { useState } from "react";
import Loader from '@/components/Include/Loader';

export default function UserList({ onClose }) {

    const { api } = useAxios();
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const {setChatUser} = useChat();

    const addToRoom = async (userId) => {
        const participants = [userId];

        if (participants.length == 0) {
            return;
        }

        setLoading(true);

        try {
            const {data} = await api.post('/chat/add-to-room', { participants })
            console.log('data mm',data)
            if(data?.message){
                alert(data.message)
                setChatUser((prev)=>{
                    const newData = [{...data.data},...prev];
                    console.log('newData',newData)
                    return newData;
                })
                onClose()
            }
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const handleSearch = async () => {
        setLoading(true)
        try {
            const { data } = await api.get(`/auth/search-user?search=${search}`);
            // console.log('result', data)
            if (data?.users?.length > 0) {
                setUsers([...data.users])
            }
        } catch (err) {

        } finally {
            setLoading(false)
        }

    }

    // console.log('chats',chats)

    return (
        <div className="w-full max-w-screen-xl mx-auto px-6">
            {loading && <Loader />}
            <div className="flex justify-center p-4 px-3 py-10">
                <div className="w-full max-w-md">
                    <div className="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
                        <div className="block text-gray-700 text-lg font-semibold py-2 px-2">
                            User List
                        </div>
                        <div className="mb-5">
                            <div className="flex items-center bg-gray-200 rounded-md">
                                <div className="pl-2">
                                    <svg
                                        className="fill-current text-gray-500 w-6 h-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className="heroicon-ui"
                                            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
                                    type="text"
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                    placeholder="Search users"
                                />
                                <button onClick={handleSearch} className="default-btn m-0 rounded-none">
                                    Search
                                </button>
                            </div>

                        </div>
                        {users.length > 0 &&
                            <div className="text-sm border my-5 max-h-200">
                                {
                                    users.map((user, i) =>
                                    (<div key={i} onClick={() => addToRoom(user._id)} className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-none px-2 py-2 my-2">
                                        {/* <span className="bg-gray-400 h-2 w-2 m-2 rounded-full"></span> */}
                                        <div className="flex-grow font-medium px-2">{user.name}</div>
                                    </div>)
                                    )
                                }
                            </div>
                        }
                        <div className="block bg-gray-200 text-sm text-right py-2 px-3 -mx-3 -mb-2 rounded-b-lg">
                            <button onClick={onClose} className="hover:text-gray-600 text-gray-500 font-bold py-2 px-4">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
} 