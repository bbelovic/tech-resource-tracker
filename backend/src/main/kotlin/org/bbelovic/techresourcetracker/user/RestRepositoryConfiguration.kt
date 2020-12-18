package org.bbelovic.techresourcetracker.user

import org.bbelovic.techresourcetracker.TechnologyResource
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer

class RestRepositoryConfiguration : RepositoryRestConfigurer {
    override fun configureRepositoryRestConfiguration(config: RepositoryRestConfiguration?) {
        config?.exposeIdsFor(TechnologyResource::class.java)
        config?.setBasePath("/api")
    }
}