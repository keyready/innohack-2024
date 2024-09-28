package repositories

import (
	"backend/internal/dto/other"
	"backend/internal/dto/response"
	"backend/internal/models"
	"backend/pkg/settings"
	"gorm.io/gorm"
	"io/ioutil"
	"net/http"
	"strconv"
)

type ProjectRepository interface {
	FetchAllProjects(pagination other.Pagination) (httpCode int, err error, data response.AllProjectsResponse)
	ImportProjectWithGit(projectName string) (httpCode int, err error)
}

type ProjectRepositoryImpl struct {
	DB *gorm.DB
}

func NewProjectsRepositoryImpl(db *gorm.DB) ProjectRepository {
	return &ProjectRepositoryImpl{DB: db}
}

func (p ProjectRepositoryImpl) ImportProjectWithGit(projectName string) (httpCode int, err error) {
	req, err := http.NewRequest("GET", settings.AppSettings.GitHubAllRepos+"/"+projectName, nil)
	if err != nil {
		return http.StatusInternalServerError, err
	}

	defer req.Body.Close()

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return http.StatusInternalServerError, err
	}

	ioutil.ReadAll(resp.Body)

	return http.StatusOK, nil
}

func (p ProjectRepositoryImpl) FetchAllProjects(pagination other.Pagination) (httpCode int, err error, data response.AllProjectsResponse) {
	skip, _ := strconv.Atoi(pagination.Page)
	limit, _ := strconv.Atoi(pagination.PerPage)

	var prjs []models.ProjectModel
	p.DB.Offset(skip).Limit(limit).Find(&prjs)

	data.Data = prjs
	data.TotalCont = len(prjs)

	return http.StatusOK, nil, data
}
