import '../../styles/info/Tabs.css'

const Tabs = ({ currentTab, setCurrentTab }) => {
    const tabs = [
        { key: 'UseInfo', label: '이용정보' },
        { key: 'Review', label: '이용후기' },
        { key: 'Expectation', label: '기대평' },
        { key: 'Qna', label: 'Q&A' },
    ];

    return (
        <div className='TabContainer'>
            <ul className='TabList'>
                {tabs.map((tab) => (
                    <li
                        key={tab.key}
                        className={`TabItem ${currentTab === tab.key ? 'active' : ''}`}
                    >
                        <button
                            className={`TabButton ${currentTab === tab.key ? 'active' : ''}`}
                            onClick={() => setCurrentTab(tab.key)}
                        >
                            {tab.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tabs;
