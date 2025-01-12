import { useState } from 'react';
import { useStyles } from './style';
import { useForm } from '@mantine/form';
import { IconUpload } from '@tabler/icons';
import { Modal, Button, Group, Title, DefaultProps, TextInput, Textarea, NumberInput, FileInput } from '@mantine/core';
import { Dinosaur } from '../../api/api';

export interface CreateModalProps extends DefaultProps {
    onOpen: boolean;
    onToggle: () => void;
    onSubmit: Function;
}

export function CreateModal({ onOpen, onSubmit, onToggle }: CreateModalProps) {
    const { classes } = useStyles();

    const [file, setFile] = useState<File | null>(null);

    const form = useForm({
        initialValues: {
            image: file,
            name: '',
            species: '',
            feeding_habit: '',
            height: 0,
            length: 0,
            weight: 0,
            region: '',
            short_description: '',
            description: ''
        },
        validate: {
            name: (value) => (value.length < 0 ? 'Name must have any caracter' : null),
            species: (value) => (!value ? 'This field needs to be filled' : null),
            feeding_habit: (value) => (!value ? 'This field needs to be filled' : null),
            height: (value) => (!value ? 'This field needs to be filled' : null),
            length: (value) => (!value ? 'This field needs to be filled' : null),
            weight: (value) => (!value ? 'This field needs to be filled' : null),
            region: (value) => (!value ? 'This field needs to be filled' : null),
            short_description: (value) => (!value ? 'This field needs to be filled' : null),
            description: (value) => (!value ? 'This field needs to be filled' : null),
            image: (value: File) => (!value ? 'Need to atache a image' : null),
        },
    });

    const submit = async () => {
        const newDinosaur = await Dinosaur.createDinosaur({ ...form.values })
        form.reset()
        onSubmit(newDinosaur)
    }

    return (
        <>
            <Modal
                opened={onOpen}
                overlayOpacity={0.55}
                overlayBlur={3}
                onClose={() => { onToggle(); form.reset(); }}
                title={
                    <Title order={3} weight={500}>
                        Add Dinosaur 🦖
                    </Title>
                }
            >
                <form onSubmit={form.onSubmit((values) => {submit()})}>
                    <Group className={classes.flex} grow mt="sm">
                        <TextInput withAsterisk label="Name" placeholder="Name" {...form.getInputProps('name')} />
                        <TextInput withAsterisk label="Species" placeholder="Species" {...form.getInputProps('species')} />
                    </Group>
                    <Group className={classes.flex} grow mt="sm">
                        <TextInput withAsterisk label="Feeding Habit" placeholder="Feeding Habit" {...form.getInputProps('feeding_habit')} />
                        <TextInput withAsterisk label="Region" placeholder="Region" {...form.getInputProps('region')} />
                    </Group>
                    <Group className={classes.flex} grow mt="sm">
                        <NumberInput withAsterisk label="Height in m" placeholder="Height" {...form.getInputProps('height')} />
                        <NumberInput withAsterisk label="Length in m" placeholder="Length" {...form.getInputProps('length')} />
                        <NumberInput withAsterisk label="Weight in kg" placeholder="Weight" {...form.getInputProps('weight')} />
                    </Group>
                    <Group className={classes.flex} grow mt="sm">
                        <Textarea autosize minRows={1} maxRows={4} withAsterisk label="Short Description" {...form.getInputProps('short_description')} />
                        <Textarea autosize minRows={1} maxRows={4} withAsterisk label="Description" {...form.getInputProps('description')} />
                    </Group>

                    <Group mt="xl" position="apart">
                        <FileInput withAsterisk
                            placeholder="Your image"
                            accept="image/*"
                            onChange={setFile} {...form.getInputProps('image')}
                            icon={<IconUpload size={14} />} />
                        <Button type="submit"> Confirm </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
