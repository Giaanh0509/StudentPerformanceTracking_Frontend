import { useParams } from 'react-router-dom';

export const SubjectDetail = () => {

    const { subjectName } = useParams();

    return (
        <div className='flex flex-col h-full bg-white m-8 p-3'>
            <div className="flex">
                <div className="text-3xl px-8 py-4 font-montserrat font-semibold">
                    Manage Subject / {subjectName}
                </div>
            </div>
        </div>
    )
}