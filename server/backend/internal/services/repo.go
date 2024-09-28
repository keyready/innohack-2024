package services

import (
	"backend/internal/dto/other"
	"backend/internal/dto/response"
	"backend/internal/repositories"
)

type RepoService interface {
	FetchPrivateRepos(token string, pagination other.Pagination) (httpCode int, err error, repos response.ReposResponse)
	FetchAllRepos(token string, pagination other.Pagination) (httpCode int, err error, repos response.ReposResponse)
}

type RepoServiceImpl struct {
	repoRepository repositories.RepoRepository
}

func NewRepoServiceImpl(repoRepository repositories.RepoRepository) RepoService {
	return &RepoServiceImpl{repoRepository: repoRepository}
}

func (r RepoServiceImpl) FetchPrivateRepos(token string, pagination other.Pagination) (httpCode int, err error, repos response.ReposResponse) {
	httpCode, err, repos = r.repoRepository.FetchPrivateRepos(token, pagination)
	return httpCode, err, repos
}

func (r RepoServiceImpl) FetchAllRepos(token string, pagination other.Pagination) (httpCode int, err error, repos response.ReposResponse) {
	httpCode, err, repos = r.repoRepository.FetchAllRepos(token, pagination)
	return httpCode, err, repos
}
