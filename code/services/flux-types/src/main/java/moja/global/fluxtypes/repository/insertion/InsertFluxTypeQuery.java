/*
 * Copyright (C) 2021 Moja Global
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 * If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */
package moja.global.fluxtypes.repository.insertion;

import moja.global.fluxtypes.configurations.DatabaseConfig;
import moja.global.fluxtypes.models.FluxType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

/**
 * @since 1.0
 * @author Kwaje Anthony <tony@miles.co.ke>
 * @version 1.0
 */
@Component
@Slf4j
public class InsertFluxTypeQuery {

	@Autowired
	DatabaseConfig databaseConfig;

	/**
	 * Inserts a new fluxType record into the database
	 * @param fluxType a bean containing the record's details
	 * @return the unique identifier of the newly inserted fluxType record
	 */
	public Mono<Long> insertFluxType(FluxType fluxType){
		
		log.trace("Entering insertFluxType()");

		String query = "INSERT INTO flux_type(name, description) VALUES(?,?)";

		return
			Mono.from(
				databaseConfig
					.getDatabase()
					.update(query)
					.parameters(fluxType.getName(), fluxType.getDescription())
					.returnGeneratedKeys()
					.getAs(Long.class));
	}

}