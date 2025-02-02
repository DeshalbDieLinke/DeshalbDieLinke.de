import {type ContentItem} from "../types/ContentItem.ts";
import ContentPopup from "./ContentPopup.tsx";
import { useState, useEffect, useRef } from "react";
import NewContentComponent from "./NewContentComponent.tsx";

export default function GridWrapper(props: { contentItems: ContentItem[] }) {
    const contentItems = props.contentItems;

    const [Popup, setPopup] = useState(<div></div>);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showVerifiedOnly, setShowVerifiedOnly] = useState(false); 
    const itemsPerPage = 12;

    const allTopics = Array.from(new Set(contentItems.flatMap(item => item.topics)));

    const filteredItems = contentItems.filter(item => {
        const topicMatch = selectedTopics.length > 0
            ? item.topics.some(topic => selectedTopics.includes(topic))
            : true;

        const verifiedMatch = showVerifiedOnly ? item.official : true;

        return topicMatch && verifiedMatch;
    });

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    function deletePopup(_: any) {
        setPopup(<div></div>);
    }

    function openPopup(item: ContentItem) {
        let p = <ContentPopup item={item} deleteCallback={deletePopup} />;
        setPopup(p);
    }

    const toggleTopic = (topic: string) => {
        setSelectedTopics((prev) => {
            if (prev.includes(topic)) {
                return prev.filter(t => t !== topic);
            }
            return [...prev, topic];
        });
        setCurrentPage(1);
    };

    const clearSelection = () => {
        setSelectedTopics([]);
        setShowVerifiedOnly(false);
        setCurrentPage(1);
    };

    const SelectionPills = () => (
        <div className="selection-pills flex flex-wrap gap-1 m-1 md:m-2">

{(selectedTopics.length > 0 || showVerifiedOnly )&& (
    <button
        onClick={clearSelection}
        className="swap-on px-4 py-2 border rounded bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-300 flex items-center gap-2"
    >
        <svg

            fill="#ffffff"
            height="20px"
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 460.775 460.775"
        >
            <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
        </svg>
                </button>
            )}
            <button
                onClick={() => {
                    setShowVerifiedOnly(prev => !prev);
                    setCurrentPage(1); 
                }}
                className={`px-4 py-2 border rounded transition-colors duration-300 flex items-center gap-2 ${
                    showVerifiedOnly
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
                Offizielle
                <img src="/images/icons/verified.svg" alt="Offizelle" width="20" height="20" />
            </button>
            {allTopics.map(topic => (
                
                <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`px-4 py-2 border rounded transition-colors duration-300 ${
                        selectedTopics.includes(topic)
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                    {topic.charAt(0).toUpperCase() + topic.slice(1)}
                </button>
            ))}
            
        </div>
    );

    const PaginationControls = () => {
        const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    
        return (
            <div className="pagination-controls flex justify-center items-center my-4 join">
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={`join-item btn ${currentPage === number ? "btn-active" : ""}`}
                    >
                        {number}
                    </button>
                ))}
            </div>
        );
    };
    

    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            const hashTopic = window.location.hash.slice(1);
            if (hashTopic && allTopics.includes(hashTopic)) {
                setSelectedTopics([hashTopic]);
            }
            initialized.current = true;
        }
    }, []);

    return (
        <div id="ContentDisplay" className="ContentWrapper bg-gray-100 w-full h-full z-50 p-1 md:p-8">
            
            <SelectionPills />
            <PaginationControls />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 md:gap-4 h-fit z-10 m-1 md:m-4 flex-wrap">
                {filteredItems.length > 0 ? (
                    paginatedItems.map(item => (
                        <NewContentComponent
                            key={item.id}
                            item={item}
                            clickCallback={openPopup}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        Keine Inhalte verfügbar
                    </div>
                )}
            </div>
            <PaginationControls />
            {Popup}
        </div>
    );
    
}
