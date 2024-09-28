package services

import (
	"backend/internal/dto/other"
	"backend/internal/dto/response"
	"backend/internal/repositories"
)

type ProjectService interface {
	FetchAllProjects(pagination other.Pagination) (httpCode int, err error, data response.AllProjectsResponse)
	ImportProjectWithGit(projectName string) (httpCode int, err error) //Переход репозитория в проект
}

type ProjectServiceImpl struct {
	prjRepository repositories.ProjectRepository
}

func NewProjectServiceImpl(prjRepository repositories.ProjectRepository) ProjectService {
	return &ProjectServiceImpl{prjRepository: prjRepository}
}

func (p ProjectServiceImpl) FetchAllProjects(pagination other.Pagination) (httpCode int, err error, data response.AllProjectsResponse) {
	httpCode, err, data = p.prjRepository.FetchAllProjects(pagination)
	return httpCode, err, data
}

func (p ProjectServiceImpl) ImportProjectWithGit(projectName string) (httpCode int, err error) {
	httpCode, err = p.prjRepository.ImportProjectWithGit(projectName)
	return httpCode, err
}
