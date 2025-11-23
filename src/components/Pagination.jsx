import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: '100%', mt: 3 }}
      gap={2}
    >
      <FixedButton
        variant="secondary"
        width={100}
        height={44}
        onClick={onPrevious}
        disabled={disablePrevious}
        icon={<ArrowBackIosNewIcon fontSize="small" />}
      >
        Previous
      </FixedButton>
      
      <FixedButton
        variant="secondary"
        width={100}
        height={44}
        onClick={onNext}
        disabled={disableNext}
        icon={<ArrowForwardIosIcon fontSize="small" />}
        iconPosition="right"
      >
        Next
      </FixedButton>
    </Stack>
  );
}
