package org.bbelovic.techresourcetracker.user

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import jakarta.servlet.http.HttpServletRequest

@Controller
class RouteController {
    @RequestMapping(value = ["/{path:[^\\.]*}"])
    fun redirect(req: HttpServletRequest) = "forward:/"
}