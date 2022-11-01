import { Card, Image, Text, Group, Badge, ActionIcon } from '@mantine/core';
import { useStyles } from './style';
import { StyledModal } from '../StyledModal';
import { DeleteModal } from '../DeleteModal';
import { IDinosaur } from '../../models/dinosaur.interface';
import { IconTrash } from '@tabler/icons';
import { useDisclosure } from '@mantine/hooks';

interface BadgeCardProps {
    dinosaur: IDinosaur;
    onRemove: () => void;
    badges: {
        emoji: string;
        label: string;
    }[]
}

export function BadgeCard({ dinosaur, badges, onRemove }: BadgeCardProps) {
    const { classes, theme } = useStyles();
    const [isModalRemoveOpen, removeHandler] = useDisclosure(false);

    const features = badges.map((badge, index) => (
        <Badge
            color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
            key={index}
            leftSection={badge.emoji}
        >
            {badge.label}
        </Badge>
    ));

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
                <Image src={dinosaur.image} alt={dinosaur.name} height={180} />
            </Card.Section>

            <Card.Section className={classes.section}>
                <Group position="apart">
                    <Text size="lg" weight={500}>
                        {dinosaur.name}
                    </Text>
                    <Badge size="sm">🌎 {dinosaur.region}</Badge>
                </Group>
                <Text size="sm" mt="xs">
                    {dinosaur.short_description}
                </Text>
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
                <Text style={{}} size="sm" className={classes.label} color="dimmed">
                    Detailed Info
                </Text>
                <Group spacing={7} mt={5}>
                    {features}
                </Group>
            </Card.Section>

            <Group mt="xs">
                <StyledModal title={`${dinosaur.name}`} buttonValue='Show details' content={`${dinosaur.description}`} />
                <DeleteModal
                    dinosaurID={dinosaur.id}
                    isOpen={isModalRemoveOpen}
                    onToggle={removeHandler.toggle}
                    onRemove={() => { onRemove() }}
                />
                <Group position="center">
                    <ActionIcon onClick={() => removeHandler.toggle()} variant="default" radius="md" size={36}>
                        <IconTrash size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Group>
        </Card>
    );
}
