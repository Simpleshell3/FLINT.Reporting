/*
 * Copyright (C) 2021 Moja Global
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 * If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */
package ke.co.miles.fluxtypes.repository.updation;

import ke.co.miles.fluxtypes.configurations.DatabaseConfig;
import ke.co.miles.fluxtypes.models.FluxType;
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
public class UpdateFluxTypeQuery {

	@Autowired
	DatabaseConfig databaseConfig;

	/**
	 * Updates a fluxType record
	 * @param fluxType a bean containing the record's details
	 * @return the number of records affected by the query i.e updated
	 */
	public Mono<Integer> updateFluxType(FluxType fluxType){
		
		log.trace("Entering updateFluxType()");

		String query = "UPDATE flux_type SET name = ?, description = ? WHERE id = ?";

		return
			Mono.from(
				databaseConfig
					.getDatabase()
					.update(query)
					.parameters(fluxType.getName(), fluxType.getDescription(), fluxType.getId())
					.counts());
	}
}
