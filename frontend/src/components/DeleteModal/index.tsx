import { useState } from 'react';
import { useStyles } from './style';
import { IconTrash } from '@tabler/icons';
import { Modal, Button, Group, Title, DefaultProps, ActionIcon, TextInput, Textarea, NumberInput, FileButton } from '@mantine/core';
import { Dinosaur } from '../../api/api';

export interface DeleteModalProps extends DefaultProps {
    id: number;
    // onOpen: () => void;
    // setIsEdit: (state: boolean) => void;
    // dinosaur: DinosaurType;
}

export function DeleteModal({ id, onOpen, setIsEdit, dinosaur }: DeleteModalProps) {
    const [opened, setOpened] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const { classes } = useStyles();

    return (
        <>
            <Modal
                opened={opened}
                overlayOpacity={0.55}
                overlayBlur={3}
                onClose={() => { setOpened(false) }}
                title={
                    <Title order={3} weight={500}>
                        Remove Dinosaur 🦖☄
                    </Title>
                }
            >
                <Button onClick={() => { Dinosaur.deleteDinosaur(id) }} />
            </Modal>

            <Group position="center">
                <ActionIcon onClick={() => setOpened(true)} variant="default" radius="md" size={36}>
                    <IconTrash size={18} stroke={1.5} />
                </ActionIcon>
            </Group>
        </>
    );
}