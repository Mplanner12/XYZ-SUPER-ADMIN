import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import CreateGeneralJournalTab from './CreateGeneralJournal';


const GeneralJournalTab: React.FC = () => {
    const [menu, setMenu] = useState<number>(0)

    const menuBar = [
        {
            name: "Create a General Journal",
            id: 1
        },
    ];
    
    return (
        <>
            {menu === 0 &&
                <main className='pb-10'>
                    {menuBar?.map(({ name, id }: any) => (
                        <p
                            key={id}
                            className={`flex flex-col justify-between text-xl my-8`}
                            onClick={(e) => {
                                e.preventDefault();
                                setMenu(id);
                            }}
                        >
                            <span className="flex gap-1 cursor-pointer items-center mb-[4px]"> <Plus size={"22px"} color="#8133F1" /> {name}</span>
                        </p>
                    ))}
                    <div>
                        <Image className="mr-1" src="/emptyState.png" width={2000} height={2000} alt="icon" />
                    </div>
                </main>
            }

            {menu === 1 && <CreateGeneralJournalTab goBack={() => setMenu(0)} />}

        </>

    );
};

export default GeneralJournalTab;
