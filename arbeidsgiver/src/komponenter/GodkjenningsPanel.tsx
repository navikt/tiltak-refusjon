import { PropsWithChildren, ReactNode, useId } from 'react';

import { BodyShort, Box, Checkbox, VStack } from '@navikt/ds-react';

interface GodkjenningsPanelProps {
    isChecked: boolean;
    setChecked: (checked: boolean) => void;
    checkboxLabel: string;
    error?: ReactNode;
}

const GodkjenningsPanel = ({
    isChecked,
    setChecked,
    children,
    checkboxLabel,
    error,
}: PropsWithChildren<GodkjenningsPanelProps>) => {
    const errorId = useId();

    return (
        <Box
            background={isChecked ? 'success-moderate' : 'warning-moderate'}
            borderColor={isChecked ? 'success' : 'warning'}
            borderRadius="8"
            borderWidth="1"
            padding={{ xs: 'space-16', md: 'space-20' }}
        >
            <VStack gap="space-16">
                {children}
                <Checkbox
                    checked={isChecked}
                    error={!!error}
                    errorId={error ? errorId : undefined}
                    onChange={(event) => setChecked(event.currentTarget.checked)}
                >
                    {checkboxLabel}
                </Checkbox>
                {error && (
                    <BodyShort id={errorId} size="small" role="alert">
                        {error}
                    </BodyShort>
                )}
            </VStack>
        </Box>
    );
};

export default GodkjenningsPanel;
