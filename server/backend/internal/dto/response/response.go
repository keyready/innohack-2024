package response

import "backend/internal/models"

type TokenProvider struct {
	Token string `json:"accessToken"`
}

type AllProjectsResponse struct {
	TotalCont int `json:"totalCount"`
	Data      []models.ProjectModel
}

type ReposResponse struct {
	TotalCount int `json:"totalCount"`
	Data       []map[string]interface{}
}
