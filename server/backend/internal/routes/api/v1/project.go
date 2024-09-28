package v1

import (
	"backend/internal/controllers"
	"github.com/gin-gonic/gin"
)

func NewProjectRoutes(r *gin.Engine, prjc *controllers.ProjectController) {
	prjRoutes := r.Group("/api/projects")

	prjRoutes.GET("", prjc.FetchAllProjects)
	prjRoutes.POST("/import", prjc.ImportProjectWithGit)
}
