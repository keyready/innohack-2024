package repositories

import (
	"backend/internal/dto/other"
	"backend/internal/dto/response"
	"backend/pkg/settings"
	"encoding/json"
	"fmt"
	"gorm.io/gorm"
	"io/ioutil"
	"net/http"
)

type RepoRepository interface {
	FetchPrivateRepos(token string, pagination other.Pagination) (httpCode int, err error, repos response.ReposResponse)
	FetchAllRepos(token string, pagination other.Pagination) (httpCode int, err error, repos response.ReposResponse)
}

type RepoRepositoryImpl struct {
	DB *gorm.DB
}

func NewRepoRepositoryImpl(db *gorm.DB) RepoRepository {
	return &RepoRepositoryImpl{DB: db}
}

func (r RepoRepositoryImpl) FetchPrivateRepos(token string, pagination other.Pagination) (httpCode int, err error, repos response.ReposResponse) {
	request, err := http.NewRequest(
		http.MethodGet,
		fmt.Sprintf("%sper_page=%s&page=%s", settings.AppSettings.GitHubPrivateRepos, pagination.PerPage, pagination.Page),
		nil,
	)
	if err != nil {
		return http.StatusInternalServerError, err, repos
	}

	request.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token))

	httpClient := &http.Client{}
	response, err := httpClient.Do(request)
	if err != nil {
		return http.StatusInternalServerError, err, repos
	}

	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return http.StatusInternalServerError, err, repos

	}

	repos.Data = make([]map[string]interface{}, 0)
	jsonErr := json.Unmarshal(body, &repos.Data)
	if jsonErr != nil {
		return http.StatusInternalServerError, err, repos
	}

	repos.TotalCount = len(repos.Data)

	return response.StatusCode, nil, repos
}

func (r RepoRepositoryImpl) FetchAllRepos(token string, pagination other.Pagination) (httpCode int, err error, repos response.ReposResponse) {
	request, err := http.NewRequest(
		http.MethodGet,
		fmt.Sprintf("%s?per_page=%s&page=%s", settings.AppSettings.GitHubAllRepos, pagination.PerPage, pagination.Page),
		nil,
	)
	if err != nil {
		return http.StatusInternalServerError, err, repos
	}

	request.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token))

	httpClient := &http.Client{}
	response, err := httpClient.Do(request)
	if err != nil {
		return http.StatusInternalServerError, err, repos
	}

	defer response.Body.Close()
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return http.StatusInternalServerError, err, repos
	}

	repos.Data = make([]map[string]interface{}, 0)

	json.Unmarshal(body, &repos.Data)

	repos.TotalCount = len(repos.Data)

	return http.StatusOK, nil, repos
}
