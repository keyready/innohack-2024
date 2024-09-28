package controllers

import (
	"backend/internal/dto/other"
	"backend/internal/services"
	"backend/pkg/app"
	"github.com/gin-gonic/gin"
	"net/http"
)

type RepoController struct {
	repoService services.RepoService
}

func NewRepoController(repoService services.RepoService) *RepoController {
	return &RepoController{repoService: repoService}
}

func (rp *RepoController) FetchPublicRepos(ctx *gin.Context) {
	appGin := app.Gin{Ctx: ctx}

	var pagination other.Pagination
	bindErr := ctx.ShouldBindQuery(&pagination)
	if bindErr != nil {
		appGin.ErrorResponse(http.StatusBadRequest, bindErr)
		return
	}

	token := ctx.GetString("token")

	httpCode, err, repos := rp.repoService.FetchAllRepos(token, pagination)
	if err != nil {
		appGin.ErrorResponse(httpCode, err)
		return
	}

	appGin.SuccessResponse(http.StatusOK, repos)
}

func (rp *RepoController) FetchPrivateRepos(ctx *gin.Context) {
	appGin := app.Gin{Ctx: ctx}

	var pagination other.Pagination
	bindErr := ctx.ShouldBindQuery(&pagination)
	if bindErr != nil {
		appGin.ErrorResponse(http.StatusBadRequest, bindErr)
		return
	}
	token := ctx.GetString("token")

	httpCode, err, repos := rp.repoService.FetchPrivateRepos(token, pagination)
	if err != nil {
		appGin.ErrorResponse(httpCode, err)
		return
	}

	appGin.SuccessResponse(http.StatusOK, repos)

}
