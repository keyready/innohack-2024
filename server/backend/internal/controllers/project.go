package controllers

import (
	"backend/internal/dto/other"
	"backend/internal/services"
	"backend/pkg/app"
	"github.com/gin-gonic/gin"
)

type ProjectController struct {
	prjService services.ProjectService
}

func NewProjectControllers(prjService services.ProjectService) *ProjectController {
	return &ProjectController{prjService: prjService}
}

func (prjc *ProjectController) ImportProjectWithGit(ctx *gin.Context) {
	appGin := app.Gin{Ctx: ctx}

	repoName := appGin.Ctx.PostForm("name")

	httpCode, err := prjc.prjService.ImportProjectWithGit(repoName)
	if err != nil {
		appGin.ErrorResponse(httpCode, err)
		return
	}

	appGin.SuccessResponse(httpCode, gin.H{})
}

func (prjc *ProjectController) FetchAllProjects(ctx *gin.Context) {
	appGin := app.Gin{Ctx: ctx}
	var pagination other.Pagination

	bindErr := ctx.ShouldBindQuery(&pagination)
	if bindErr != nil {
		appGin.ErrorResponse(500, bindErr)
		return
	}

	httpCode, err, data := prjc.prjService.FetchAllProjects(pagination)
	if err != nil {
		appGin.ErrorResponse(httpCode, err)
		return
	}

	appGin.SuccessResponse(httpCode, data)
}
