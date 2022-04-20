#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
animatedTimeSeries <- function(
    data,
    settings = NULL,
    width = NULL,
    height = NULL,
    elementId = NULL
) {

    # forward options using x
    inputs <- list(
        data = data,
        settings = jsonlite::toJSON(
            settings,
            auto_unbox = TRUE,
            null = 'null'
        )
    )

    # create widget
    htmlwidgets::createWidget(
        name = 'animatedTimeSeries',
        inputs,
        # width = width,
        # height = height,
        package = 'animatedTimeSeries',
        elementId = elementId
    )
}

#' Shiny bindings for animatedTimeSeries
#'
#' Output and render functions for using animatedTimeSeries within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'     \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'     string and have \code{'px'} appended.
#' @param expr An expression that generates a animatedTimeSeries
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'     is useful if you want to save an expression in a variable.
#'
#' @name animatedTimeSeries-shiny
#'
#' @export
animatedTimeSeriesOutput <- function(outputId, width = '100%', height = '400px'){
    htmlwidgets::shinyWidgetOutput(outputId, 'animatedTimeSeries', width, height, package = 'animatedTimeSeries')
}

#' @rdname animatedTimeSeries-shiny
#' @export
renderAnimatedTimeSeries <- function(expr, env = parent.frame(), quoted = FALSE) {
    if (!quoted) { expr <- substitute(expr) } # force quoted
    htmlwidgets::shinyRenderWidget(expr, animatedTimeSeriesOutput, env, quoted = TRUE)
}
