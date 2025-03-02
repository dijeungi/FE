import { Pagination, Stack } from "@mui/material";

const Paginations = ({ page, totalPages, handlePageChange }) => {
  return (
    // Stack 컴포넌트를 사용하여 페이지네이션 컴포넌트를 수직 중앙 정렬하고, 위아래 여백을 추가합니다.
    <Stack spacing={2} alignItems="center" sx={{ mt: 3, mb: 3 }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="secondary"
        size="large"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#2A0934",
            "&.Mui-selected": {
              backgroundColor: "#ffa48c ",
              "&:hover": {
                backgroundColor: "#ff8364",
              },
            },
          },
        }}
      />
    </Stack>
  );
};

export default Paginations;
