package other

type Pagination struct {
	Page    string `query:"page"`
	PerPage string `query:"per_page"`
}
