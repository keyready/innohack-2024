package request

type Authorize struct {
	Code         string `json:"code"`
	ClientId     string
	RedirectUri  string
	ClientSecret string
}

type Refresh struct {
}
