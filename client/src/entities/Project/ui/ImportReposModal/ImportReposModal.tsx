import { Modal, ModalContent, ModalHeader, Tab, Tabs } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { Key, useCallback, useEffect, useState } from 'react';

import { useRepos } from '../../api/ProjectsApi';
import { ReposList } from '../ReposList/ReposList';

interface ImportReposModalProps {
    className?: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const ImportReposModal = (props: ImportReposModalProps) => {
    const { className, isOpen, setIsOpen } = props;

    const { t } = useTranslation();

    const [activeTab, setActiveTab] = useState<string>('public');
    const [page, setPage] = useState<number>(1);
    const [totalRepos, setTotalRepos] = useState<number>(0);

    const { data: repos, isLoading } = useRepos({
        type: activeTab,
        skip: (page - 1) * 10,
    });

    useEffect(() => {
        if (repos?.totalCount) {
            setTotalRepos(repos.totalCount / 10 || 0);
        }
    }, [repos?.totalCount]);

    const handleTabChange = useCallback((key: Key) => {
        setActiveTab(key as string);
        setPage(1);
    }, []);

    return (
        <Modal
            hideCloseButton={isLoading}
            isDismissable={!isLoading}
            size="2xl"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <ModalContent className="p-5">
                <ModalHeader>
                    <h1 className="text-l">{t('Импортировать репозитории')}</h1>
                </ModalHeader>
                <Tabs
                    selectedKey={activeTab}
                    onSelectionChange={handleTabChange}
                    classNames={{
                        tabList: 'w-full',
                    }}
                >
                    <Tab isDisabled={isLoading} key="public" title={t('Открытые репозитории')}>
                        <ReposList
                            page={page}
                            setPage={setPage}
                            isLoading={isLoading}
                            repos={repos?.projects}
                            total={totalRepos}
                        />
                    </Tab>
                    <Tab isDisabled={isLoading} key="private" title={t('Приватные репозитории')}>
                        <ReposList
                            page={page}
                            setPage={setPage}
                            isLoading={isLoading}
                            repos={repos?.projects}
                            total={totalRepos}
                        />
                    </Tab>
                </Tabs>
            </ModalContent>
        </Modal>
    );
};
