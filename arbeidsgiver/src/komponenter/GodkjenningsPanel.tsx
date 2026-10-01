import { PropsWithChildren, ReactNode, useId } from 'react';

import { Box, Checkbox, InlineMessage, VStack } from '@navikt/ds-react';

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
                    aria-describedby={error ? errorId : undefined}
                    checked={isChecked}
                    error={!!error}
                    onChange={(event) => setChecked(event.currentTarget.checked)}
                >
                    {checkboxLabel}
                </Checkbox>
                {error && (
                    <InlineMessage id={errorId} status="error">
                        {error}
                    </InlineMessage>
                )}
            </VStack>
        </Box>
    );
};

export default GodkjenningsPanel;
